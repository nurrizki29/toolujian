//import hook react
import React, { useState ,useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';

import Cookies from 'universal-cookie';

function Signout() {
    const cookies = new Cookies();
    const history = useHistory();
    cookies.remove("data");
    //redirect login page
    history.push('/');
    return (<div></div>
    )
}

export default Signout
