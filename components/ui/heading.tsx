"use client";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="pl-3">
      <h2 className="text-3x1 font-bold tracking-tight">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Heading;
