import { Button } from 'antd'
import './home.styl'

import { goto } from '@/api'
// import MyComponent from '../../components/mycomponent'
// import { ContactPage } from '../ContactPage'

function Home() {


    return (
        <div className="P-home">
            <h1>Home Page</h1>
            <div></div>
            <div className="ipt-con">
                <Button onClick={()=>goto('/login')}>返回登录0</Button>
            </div>
            {/* <MyComponent/> */}
        </div>
    )
}

export default Home
