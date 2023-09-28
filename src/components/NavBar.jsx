export default function NavBar() {
  return (
    <ul className="menu menu-horizontal bg-base-200 w-full justify-center rounded-box">
      <li className="btn-accent rounded-box mx-1">
        <a href="/">Get Windows</a>
      </li>
      <li className="btn-accent rounded-box mx-1">
        <a href="/projects">My Projects</a>
      </li>
      <li className="btn-accent rounded-box mx-1">
        <a href="/contact">Contact Us</a>
      </li>
    </ul>
  );
}
