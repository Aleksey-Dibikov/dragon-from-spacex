import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { setUser } from "../redux/Auth/AuthSlice";
import Form from "./Form/Form";

function LogIn() {
    const dispatch = useDispatch();
    
    function handleLog(email, password) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                toast.success('Success')
            })
            .catch((error) => {
                toast('invalid email or password!!!')
                console.error(error)
            })
    }

    return (
        <Form
            title='Log in'
            handleSubmit={handleLog}
        />
    )
}

export default LogIn;