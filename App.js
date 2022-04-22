import RootNavigation from './navigation'
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
    <RootNavigation/>
    <Toast topOffset={80}/>
    </>
  );
}

