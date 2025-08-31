const EducationImage: React.FC<{ image_url: string }> = ({ image_url }) => {
  return (
    <img
      src={image_url}
      alt={`Quiz Image`}
      className="self-center mb-3 max-w-full"
    />
  );
};

export default EducationImage;
