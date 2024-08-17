import React, { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  withMarginTop?: boolean;
}

export const H1: React.FC<TypographyProps> = ({ children }) => {
  return (
    <h1 className="scroll-m-20 text-xl font-semibold text-muted-foreground tracking-tight">
      {children}
    </h1>
  );
};

export const P: React.FC<TypographyProps> = ({ children }) => {
  return (
    <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mb-6">
      {children}
    </p>
  );
};

export const Ul: React.FC<TypographyProps> = ({ children }) => {
  return <ul className="my-6 ml-6 list-disc">{children}</ul>;
};
export const Li: React.FC<TypographyProps> = ({ children }) => {
  return <li className="leading-7 text-muted-foreground">{children}</li>;
};
