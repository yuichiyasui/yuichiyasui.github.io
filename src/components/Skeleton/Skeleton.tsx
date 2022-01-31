import styles from "./Skeleton.module.css";

type Props = {
  className: string;
};

export const Skeleton = ({ className }: Props) => {
  return (
    <div
      className={`${styles.skeleton} relative overflow-hidden bg-gray-300 ${className}`}
    ></div>
  );
};
