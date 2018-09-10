import React from 'react';
import Wrapper from '../wrapper/wrapper';
import Loader from '../../components/ui/loader/loader';

const withLoader = (WrappedComponent) => {
    return class LoaderWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                showLoader: false
            }
        }
        showLoader = () => {
            this.setState({showLoader: true})
        }
        hideLoader = () => {
            this.setState({showLoader: false})
        }
        render() {
            return (
                <Wrapper>
                    <Loader show={this.state.showLoader}/>
                    <WrappedComponent
                        { ...this.props }
                        showLoader={() => this.showLoader()}
                        hideLoader={() => this.hideLoader()}/>
                </Wrapper>
            );
        }
    }

}
export default withLoader;