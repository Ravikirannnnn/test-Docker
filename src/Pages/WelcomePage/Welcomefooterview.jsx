import React from 'react'
import './welcomefooterview.css'
import { useState } from 'react';

export default function Welcomefooterview() {
    const [loaded, setLoaded] = useState(false);

return (
<div className='welcomefooterview-conatinerheader' >
<div className='welcomefooter-down'>
<div className='welcomefooter-downsub'>
<span className='welcomefooter-downtext' style={{color:'white'}}>Download the app</span>
<span className='welcomefooter-downsubtext'>
Get unlimited access to Yoga Teacher Trainings, Yoga classes, Meditation and Pranayama, Yogic Wisdom and more.</span>
<div className='welcomefooter-playapple'>
<div className='welcomefooter-downplaystore'>
{!loaded && <div className="placeholder">Loading...</div>}
<img src='/assets/Apple.png'   alt="ellipse" style={{ height: 30, width: 30 }} onLoad={() => setLoaded(true)}/>
<div className='welcomefooter-downplaystore-sub'>
    <span className='welcomefooter-downplaystore-subtext'>Get in</span>
    <span className='welcomefooter-downplaystore-subtext1'>Apple store</span>
</div>
</div>
<div className='welcomefooter-downplaystore'>
{!loaded && <div className="placeholder">Loading...</div>}
<img src='/assets/playstore.png' onLoad={() => setLoaded(true)}   alt="ellipse" style={{ height: 30, width: 30 }} />
<div className='welcomefooter-downplaystore-sub'>
    <span  className='welcomefooter-downplaystore-subtext'>Get in</span>
    <span className='welcomefooter-downplaystore-subtext1'>Play store</span>
</div>
</div>
</div>
</div>
<div  >
{!loaded && <div className="placeholder">Loading...</div>}
<img src='/assets/newBackrounf.png' onLoad={() => setLoaded(true)}  alt="ellipse" className='welcomefooterviwdownimage' />
</div>
</div>



<div></div>
<div></div>
</div>
)
}
