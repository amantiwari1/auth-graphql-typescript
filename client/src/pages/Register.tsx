import { useState } from "react"

interface Props {

}

export const Register: React.FC<Props> = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form onSubmit={e => {
      e.defaultPrevented()
      console.log('lol')

    }}>
      <div>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button type="submit" >Register</button>
      </div>
    </form>
  )
}