interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="sm:w-1/2 w-full flex items-center justify-center">
      {children}
    </div>
  );
};
