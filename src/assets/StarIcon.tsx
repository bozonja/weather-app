import { FC } from "react";

export const StarIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="white"
      viewBox="0 0 16 16"
    >
      <path
        stroke="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 1.75l1.931 3.912 4.319.632-3.125 3.044.738 4.3L8 11.605l-3.862 2.031.737-4.3L1.75 6.295l4.319-.631L8 1.75z"
      />
    </svg>
  );
};
