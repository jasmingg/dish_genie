import chefClaudeLogo from "../images/chef-claude-icon.png"
import { forwardRef } from 'react'

const Header= forwardRef((props, ref) =>  {
    return (
        <header>
            <img src={chefClaudeLogo}/>
            <h1 ref={ref}>Dish Genie</h1>
        </header>
    )
})

export default Header