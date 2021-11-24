import React, { Component } from 'react'

export default class ReCaptcha extends Component {
    render() {
        const recaptchaRef = React.useRef();
 
        const onSubmitWithReCAPTCHA = async () => {
            const token = await recaptchaRef.current.executeAsync();
        
            // apply to form data
        }
        return (
            <div>
                
            </div>
        )
    }
}
