import React from 'react'
import { signInUser } from '../../redux/actionCreators/authActionCreator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert ("ALL fields required!");
            return;
        }

        dispatch(signInUser(email, password, setSuccess));
    };

    React.useEffect(() => {
        if (success) {
            navigate("/dashboard");
        }
    },[success]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
                <input type="email" name="email" className="form-control" placeholder='Email Address' value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group my-2">
                <input type="password" name="password" className="form-control" placeholder='Password' value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="submit btn btn-primary my-2 form-control">login</button>
        </form>
    )
}

export default LoginForm;