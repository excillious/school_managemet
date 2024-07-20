// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to School Management</h1>
      <div>
        <Link href="/showSchools">
          <button style={{ margin: '10px', padding: '10px' }}>Show School</button>
        </Link>
        <Link href="/addSchool">
          <button style={{ margin: '10px', padding: '10px' }}>Add School</button>
        </Link>
      </div>
    </div>
  );
}
