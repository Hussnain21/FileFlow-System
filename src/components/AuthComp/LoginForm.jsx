import React from 'react'

const LoginForm = () => {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <form >
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