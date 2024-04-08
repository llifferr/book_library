import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {
  removeError,
  selectErrorMessage,
} from '../../redux/slices/errors/errorSlice';

const Error = () => {
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(removeError());
    }
  }, [errorMessage, dispatch]);
  return <ToastContainer theme="dark" position="top-right" autoClose={2000} />;
};
export default Error;
