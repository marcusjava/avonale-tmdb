import { Route, Redirect } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useFirebase();

  return currentUser ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
