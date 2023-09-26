import { Button } from 'antd'
import './home.styl'

import { goto } from '@/api'

// import MyComponent from '../../components/mycomponent'
// import { ContactPage } from '../ContactPage'

const { ipcRenderer } = window.electron

function Home() {

    // 读取目录文件列表
    const readDir = () => {
        // 给主进程发送消息
        ipcRenderer.send('readDir', { msg: 'test' })
        // 通过preload接收主进程的回调信息
        window.api.readDirReply((event, result) => {
            if (!result.canceled) {
                console.log(result)
            } else {
                console.log('取消选择操作。')
            }
        })
    }

    const getElectronVersion = () => {
        ipcRenderer.invoke('getElectronVersion').then((result) => {
            console.log(result)
        })
    }

    return (
        <div className="P-home">
            <h1>Home Page</h1>
            <div className="ipt-con">
                <Button type="primary" onClick={readDir}>读取目录列表</Button>
            </div>
            <div className="ipt-con">
                <Button onClick={() => goto('/login')}>返回登录</Button>
            </div>
            <div className='ipt-con'>
                <Button type='primary' onClick={getElectronVersion}>
                    查看Electron版本
                </Button>
            </div>
            {/* <MyComponent/> */}
        </div>
    )
}

export default Home
