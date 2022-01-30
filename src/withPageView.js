import React, { Component } from 'react'
import ReactGA from 'react-ga'
import {version} from '../package.json'

ReactGA.initialize(window.location.hostname.includes('d3pajak19')?"UA-216458994-4":'UA-216458994-1',{
    redactEmail:false
})
const withPageView = (WrappedComponent, options = {}) => {
    const trackPageView = page =>{
        ReactGA.set({
            page,
            ...options,
        });
        ReactGA.pageview(page)
    }
    return class extends Component {
        state = {
            page: null,
        }

        static getDerivedStateFromProps(props,state){
            const page = props.location.pathname + props.location.search;
            if (page !== state.page){
                return{
                    page,
                };
                return null;
            }
        }

        componentDidMount() {
            const page = this.props.location.pathname + this.props.location.search;
            trackPageView(page);
            let media = 'Browser';
            if (window.matchMedia('(display-mode: standalone)').matches) media = 'WebApp'
            ReactGA.set({
                dimension2: media,
                dimension3: version,
            });
        }

        componentDidUpdate(prevProps){
            const currentPage = prevProps.location.pathname + prevProps.location.search;
            const nextPage = this.state.page;
            if (currentPage !==nextPage ){
                trackPageView(nextPage);
            }
        }
        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
    }
}

export default withPageView;
