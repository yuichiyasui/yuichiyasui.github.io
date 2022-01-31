export type Props = {
  className?: string;
};

export const Footer = ({ className = "" }: Props) => {
  return (
    <footer
      className={`bg-gradient-to-br from-blue-900/90 via-sky-900/90 to-teal-800/90 py-4 ${className}`}
    >
      <div className="text-center text-sm tracking-wider text-white">
        © yuichiyasui 2022
      </div>
    </footer>
  );
};
