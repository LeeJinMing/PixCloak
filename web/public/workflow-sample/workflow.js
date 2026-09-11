(function (root) {
  'use strict';
  function settings(cap, side, prefix) {
    const kb = Number(cap), longest = Number(side);
    if (!Number.isInteger(kb) || kb < 20 || kb > 5000) throw new Error('Choose a whole-number file limit from 20 to 5000 KB.');
    if (!Number.isInteger(longest) || longest < 128 || longest > 4096) throw new Error('Choose a whole-number longest side from 128 to 4096 pixels.');
    if (!/^[A-Za-z0-9_-]{1,32}$/.test(prefix)) throw new Error('Use 1–32 letters, numbers, hyphens or underscores for the prefix.');
    return { maxBytes: kb * 1024, longest, prefix };
  }
  function csvCell(value) {
    let text = String(value == null ? '' : value);
    if (/^[\s]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  }
  function csv(rows) {
    const keys = ['source','status','output','width','height','bytes','max_bytes','max_longest_side','reason'];
    return '\ufeff' + [keys.join(','), ...rows.map(row => keys.map(key => csvCell(row[key])).join(','))].join('\r\n');
  }
  function outputName(prefix, index) { return prefix + '-' + String(index + 1).padStart(4, '0') + '.jpg'; }
  function fits(info, config) {
    return info.type === 'image/jpeg' && Number.isInteger(info.bytes) && info.bytes > 0 && info.bytes <= config.maxBytes && info.width > 0 && info.height > 0 && Math.max(info.width, info.height) <= config.longest;
  }
  function batchError(files) {
    if (!files.length) return 'Select at least one image.';
    if (files.length > 25) return 'This sample accepts at most 25 images per batch.';
    if (files.reduce((sum, file) => sum + file.size, 0) > 100 * 1024 * 1024) return 'The selected batch exceeds 100 MB.';
    return '';
  }
  const core = { settings, csvCell, csv, outputName, fits, batchError };
  if (typeof module !== 'undefined' && module.exports) module.exports = core;
  root.PixCloakWorkflow = core;
  if (typeof document === 'undefined') return;
  const get = id => document.getElementById(id);
  let report = [], exports = [], busy = false;
  function busyState(value) {
    busy = value;
    ['run','sample','files','cap','side','prefix'].forEach(id => { get(id).disabled = value; });
    get('zip').disabled = value || !exports.length;
    get('report').disabled = value || !report.length;
  }
  function drawRow(row) {
    const tr = document.createElement('tr');
    [row.source, row.status === 'pass' ? 'Verified' : row.reason, row.output || '—', row.width ? row.width + ' × ' + row.height : '—', row.bytes ? (row.bytes / 1024).toFixed(1) + ' KB' : '—'].forEach(text => {
      const td = document.createElement('td'); td.textContent = text; tr.appendChild(td);
    });
    get('rows').appendChild(tr);
  }
  function toBlob(canvas, quality) {
    return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('This browser could not export the image.')), 'image/jpeg', quality));
  }
  async function encode(file, config) {
    if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('Unsupported format: choose JPG, PNG or WebP.');
    if (file.size > 20 * 1024 * 1024) throw new Error('Image exceeds the 20 MB input limit.');
    let source, decoded;
    const canvas = document.createElement('canvas');
    try {
      source = await createImageBitmap(file);
      if (source.width * source.height > 30000000) throw new Error('Image exceeds 30 million pixels.');
      let scale = Math.min(1, config.longest / Math.max(source.width, source.height));
      for (let shrink = 0; shrink < 9; shrink++) {
        canvas.width = Math.max(1, Math.floor(source.width * scale));
        canvas.height = Math.max(1, Math.floor(source.height * scale));
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Canvas is unavailable in this browser.');
        context.fillStyle = '#fff'; context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(source, 0, 0, canvas.width, canvas.height);
        let best = await toBlob(canvas, 0.95);
        if (best.size > config.maxBytes) {
          best = await toBlob(canvas, 0.35);
          if (best.size > config.maxBytes) { scale *= 0.78; continue; }
          let low = 0.35, high = 0.95;
          for (let attempt = 0; attempt < 8; attempt++) {
            const quality = (low + high) / 2, candidate = await toBlob(canvas, quality);
            if (candidate.size <= config.maxBytes) { best = candidate; low = quality; } else high = quality;
          }
        }
        decoded = await createImageBitmap(best);
        const info = { type: best.type, bytes: best.size, width: decoded.width, height: decoded.height };
        if (!fits(info, config)) throw new Error('Export failed the final limits check.');
        return { blob: best, ...info };
      }
      throw new Error('Could not meet this size limit. Try a larger limit.');
    } finally {
      if (source) source.close(); if (decoded) decoded.close(); canvas.width = canvas.height = 1;
    }
  }
  async function processBatch(files, config) {
    report = []; exports = []; get('rows').replaceChildren(); busyState(true);
    try {
      for (let index = 0; index < files.length; index++) {
        get('status').textContent = 'Processing ' + (index + 1) + ' of ' + files.length + '…';
        const row = { source: files[index].name, status: 'failed', max_bytes: config.maxBytes, max_longest_side: config.longest };
        try {
          const result = await encode(files[index], config);
          Object.assign(row, { status: 'pass', output: outputName(config.prefix,index), width: result.width, height: result.height, bytes: result.bytes, reason: '' });
          exports.push({ name: row.output, blob: result.blob });
        } catch (error) { row.reason = error instanceof Error ? error.message : 'The image could not be processed.'; }
        report.push(row); drawRow(row);
      }
      get('status').textContent = exports.length + ' verified · ' + (report.length - exports.length) + ' failed. Review the results before using them.';
    } finally { busyState(false); }
  }
  function download(blob, name) {
    const url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = name; document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  async function selectedBatch() {
    if (busy) return;
    try {
      const config = settings(get('cap').value, get('side').value, get('prefix').value);
      const files = Array.from(get('files').files || []), error = batchError(files);
      if (error) throw new Error(error);
      await processBatch(files, config);
    } catch (error) { get('status').textContent = error.message; }
  }
  async function sampleBatch() {
    if (busy) return;
    busyState(true);
    try {
      const config = settings(get('cap').value, get('side').value, get('prefix').value), files = [];
      for (let index = 0; index < 3; index++) {
        const canvas = document.createElement('canvas'); canvas.width = 2000 + index * 300; canvas.height = 1400;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = ['#dfead9','#e9e0cf','#d5e2e9'][index]; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = ['#315d42','#81683c','#305f79'][index]; ctx.fillRect(240,240,780,780);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 88px Arial'; ctx.fillText('SAMPLE 0' + (index + 1),290,660);
        ctx.fillStyle = '#26372f'; ctx.font = '42px Arial'; ctx.fillText('Generated example · no customer data',240,1200);
        const blob = await toBlob(canvas, 0.97); canvas.width = canvas.height = 1;
        files.push(new File([blob], 'generated-sample-' + (index + 1) + '.jpg', { type: 'image/jpeg' }));
      }
      await processBatch(files, config);
    } catch (error) { get('status').textContent = error.message; } finally { busyState(false); }
  }
  get('run').addEventListener('click', selectedBatch);
  get('sample').addEventListener('click', sampleBatch);
  ['cap','side','prefix','files'].forEach(id => get(id).addEventListener('change', () => {
    if (busy) return;
    report = []; exports = []; get('rows').replaceChildren();
    get('status').textContent = 'Settings or input changed. Process a new batch to verify these requirements.';
    busyState(false);
  }));
  get('report').addEventListener('click', () => download(new Blob([csv(report)], { type:'text/csv;charset=utf-8' }), 'verification-report.csv'));
  get('zip').addEventListener('click', async () => {
    if (busy || !exports.length) return;
    busyState(true);
    try {
      if (typeof JSZip === 'undefined') throw new Error('ZIP library did not load. Download the report or reopen the sample.');
      const zip = new JSZip();
      for (const file of exports) zip.file('verified/' + file.name, await file.blob.arrayBuffer());
      zip.file('verification-report.csv', csv(report));
      zip.file('READ-ME.txt', 'PixCloak batch output\r\nOnly passing JPEG files are in verified/. Failed inputs appear in the CSV report. Check visual quality and try an upload before using a full batch. Limits use 1 KB = 1024 bytes. Original files were not modified.\r\n');
      download(await zip.generateAsync({type:'blob',compression:'STORE'}), 'pixcloak-verified-batch.zip');
      get('status').textContent = 'ZIP download requested. ' + exports.length + ' verified files and the full report are included.';
    } catch (error) { get('status').textContent = error.message; } finally { busyState(false); }
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
