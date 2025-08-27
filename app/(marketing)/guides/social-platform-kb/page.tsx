export default function GuideSocialKB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Common KB Targets for Social/Forms</h1>
        <ul>
          <li>Profile/upload forms often require 200KB/500KB</li>
          <li>Start with 200KB for avatars, 500KB for posts</li>
          <li>Keep width ≤ 1920px for fast loading</li>
        </ul>
        <p>Try <a href="/compress?kb=200">/compress?kb=200</a> for quick avatars.</p>
      </div>
    </div>
  );
}


