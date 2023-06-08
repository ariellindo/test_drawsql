export default function Header({ title }: { title: string }) {
  return (
    <header
      className="flex justify-start items-center h-14 bg-blue-900 text-white font-semibold relative shadow-md px-4"
      role="banner"
    >
      <span>{title}</span>
    </header>
  );
}
