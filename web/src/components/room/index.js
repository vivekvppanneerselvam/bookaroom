import React from 'react'
import RoomGrid from './component/roomgrid'
import RoomForm from './component/roomform'

function Room(props){
    return(
        <div><br />
        <div className="jumbotron">
            <div className="container">
                
                <fieldset>
                    <div className={'tabbable-panel'}>
                        <div className={'tabbable-line'}>
                            <ul className={'nav nav-tabs'}>                              
                                <li><a href="#tab_default_2" data-toggle="tab" >View / Edit Product</a></li>
                                <li><a href="#tab_default_3" data-toggle="tab" >Add Product</a></li>                                
                            </ul>
                            <div className={'tab-content'}>
                               
                                <div className={'tab-pane '} id="tab_default_2"><RoomGrid /></div>
                                <div className={'tab-pane '} id="tab_default_3"><RoomForm isCreate={true} /></div>
                                
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div >
        </div ></div>
    )
}

export default Room