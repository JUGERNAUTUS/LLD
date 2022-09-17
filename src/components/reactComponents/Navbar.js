import React, { Component } from 'react';


function Navbar_(props) {	


		return (
		
			
			<div className="column is-4 is-offset-8 ">	

                
                {
					props.isWeb3?
					<nav className="navbar is-fixed-bottom "  aria-label="main navigation">
					<div className="navbar-end">
					<a className="navbar-item  has-text-white"> Wallet :  &nbsp;<b>{props.account.slice(0,8)}...{props.account.slice(34,42)}</b></a></div></nav>:

					<nav className="navbar is-fixed-bottom is-transparent"  aria-label="main navigation">
					</nav>
			}
		
		</div>
		


                )
    
}

const Navbar = React.forwardRef(Navbar_);

export default Navbar;
