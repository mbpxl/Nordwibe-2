const EducationImage: React.FC<{ image_url: string }> = ({ image_url }) => {
  return (
    <div className="flex justify-center mb-3">
      <img
        src={image_url}
        alt={`Quiz Image`}
        className="w-full max-w-[300px] h-[200px] object-cover rounded-lg"
      />
    </div>
  );
};

export default EducationImage;
