export const CharacterPreview = ({
  classAttributes,
  raceAttributes,
}: {
  classAttributes: { apparel: string; color: string };
  raceAttributes: { skin: string; accessory: string };
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Character Container */}
      <div className="w-32 h-48 relative">
        {/* Body */}
        <div
          className="absolute bottom-0 w-24 h-36 rounded-md"
          style={{
            backgroundColor: classAttributes.color || '#ccc',
          }}
        ></div>

        {/* Head */}
        <div
          className="absolute top-0 left-6 w-12 h-12 rounded-full"
          style={{
            backgroundColor: raceAttributes.skin || '#d4b39f',
          }}
        ></div>

        {/* Accessory */}
        {raceAttributes.accessory === 'pointy ears' && (
          <>
            <div
              className="absolute top-3 left-2 w-2 h-4 bg-green-300 transform rotate-45"
              style={{
                backgroundColor: raceAttributes.skin || '#d4b39f',
              }}
            ></div>
            <div
              className="absolute top-3 right-2 w-2 h-4 bg-green-300 transform -rotate-45"
              style={{
                backgroundColor: raceAttributes.skin || '#d4b39f',
              }}
            ></div>
          </>
        )}

        {raceAttributes.accessory === 'tusks' && (
          <>
            <div className="absolute bottom-4 left-8 w-2 h-4 bg-white rounded-md"></div>
            <div className="absolute bottom-4 right-8 w-2 h-4 bg-white rounded-md"></div>
          </>
        )}
      </div>

      {/* Text Descriptions */}
      <p className="text-center mt-4 text-gray-700">
        {classAttributes.apparel || 'No apparel selected'}
      </p>
    </div>
  );
};
