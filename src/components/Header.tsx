import Link from "next/link";

export default function Header(props: HeaderProps) {
  return (
    <header className="flex flex-row justify-between align-middle">
      <h1 className="select-none text-xl font-bold">
        <Link href="/">{props.blogTitle}</Link>
      </h1>
      <Navigator />
    </header>
  );
}

interface HeaderProps {
  blogTitle: string;
}

function Navigator() {
  return (
    <nav>
      <ul className="flex select-none flex-row justify-end align-middle font-medium [&>li]:ml-5">
        <li>
          <Link href="/">Posts</Link>
        </li>
        <li>
          <Link href="/archive">Archive</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
