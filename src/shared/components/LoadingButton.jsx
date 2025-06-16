import Button from './Button.jsx';

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
);

const LoadingButton = ({
  isLoading,
  loadingText = 'Loading...',
  children,
  ...props
}) => {
  return (
    <Button {...props} disabled={isLoading || props.disabled}>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
