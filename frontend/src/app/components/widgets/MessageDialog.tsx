import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MessageDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText: string;
  navigateTo?: () => void; // Optional navigation function
  type?: 'success' | 'error'; // Controls styling
}

const MessageDialog: React.FC<MessageDialogProps> = ({
  open,
  onClose,
  title,
  message,
  buttonText,
  navigateTo,
  type = 'success',
}) => {
  const titleColor = type === 'success' ? 'text-[#4ba38b]' : 'text-[#ef4444]';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${titleColor}`}>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-center text-gray-700">{message}</p>
        <Button className="w-full" onClick={navigateTo ? navigateTo : onClose}>
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
