import React from "react";

const MainLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <h1 className="font-semibold text-[18px]">{title}</h1>
      </header>
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
