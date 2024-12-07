import { LoadingProps } from '@/app/utils/types';

const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  size = 'md',
}) => {
  const sizeClasses: { sm: string; md: string; lg: string } = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="flex space-x-2">
        <div
          className={`bg-blue-500 ${sizeClasses[size]} rounded-full animate-bounce`}
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className={`bg-blue-500 ${sizeClasses[size]} rounded-full animate-bounce`}
          style={{ animationDelay: '0.2s' }}
        ></div>
        <div
          className={`bg-blue-500 ${sizeClasses[size]} rounded-full animate-bounce`}
          style={{ animationDelay: '0.4s' }}
        ></div>
      </div>
      {message && <p className="text-gray-600 mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default Loading;
