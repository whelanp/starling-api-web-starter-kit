import React from 'react'
import './OAuthView.scss'
import URLSearchParams from 'url-search-params'
import {Loader, Message, Statistic, Grid, Container, Segment, Header, Image, Icon, Label, Button} from 'semantic-ui-react'
import {TransactionTable} from '../../../components/TransactionTable/TransactionTable'
import {amountDisplay} from '../../../commons/utils'
import connect from '../../../assets/Oauth-button.png'
import Dashboard from '../../../components/Dashboard/Dashboard'
import { Link } from 'react-router'


const onConnectStarling = () => {
  window.location.href = '/api/oauth/login';
};

class OAuthView extends React.Component {

  static propTypes = {
    loadTransactions: React.PropTypes.func.isRequired,
    loadBalance: React.PropTypes.func.isRequired,
    loadCustomer: React.PropTypes.func.isRequired,
    setLoading: React.PropTypes.func.isRequired,
  };

  componentWillMount () {
    this.props.setLoading(true);
    this.props.loadTransactions();
    this.props.loadCustomer();
    this.props.loadBalance();
  }

  render () {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const {loading, transactions, balance, customer} = this.props.oauth;
    return (
      <Grid>
        <br/>
        {loading ? <Loading/>
          : ( transactions && balance ?
            <Dashboard mode={'oauth'} customer={customer} transactions={transactions} balance={balance}/> : <AnonymousProfile />)}
        {error && error === 'access_denied' ? <UserDenied/> : null}
      </Grid>
    )
  }
}

const Loading = () => {
  return (
    <Loader active size="large"/>
  );
};

const AnonymousProfile = () => {
  return (
    <Container>
      <Link to="/">
        <Button>{`< Back`}</Button> </Link>
      <Segment style={{maxWidth: "400px", margin: "50px auto", maxHeight: "200px"}}>
        <Label as='a' color='purple' size="large" ribbon={true}>Sign In</Label>
    <Image src={connect}
           className='connect-button'
           height='75'
           alt='oauth-button'
           onClick={onConnectStarling}/>
      </Segment>
    </Container>
  );
};

const UserDenied = () => {
  return (
    <Message size="small">
      <Header>User Denied Access</Header>
      <p>When a user denies access Starling will callback with an error code</p>
    </Message>
  );
};

export default OAuthView