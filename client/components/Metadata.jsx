import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import background from '../images/satoshi-background.jpg'

class Metadata extends  Component {
    render() {
        return (
            
                <Helmet>
                    <title>Satoshi says</title>
                    <link rel="canonical" href="https://satoshisays.co/" />
                    <meta name="twitter:site" content="@satoshi__says" />
                    <meta name="og:description" content="Change Satoshi's message and earn money!" />
                    <meta property="og:url"       content="https://satoshisays.co/" />
                    <meta property="og:type"      content="website" />
                    <meta property="og:title"     content="Satoshi says - A blockchain speech bubble anyone can change" />                    
                    <meta property="og:image" content='https://satoshisays.co/images/20de75836b4eb82df1d0418d40ddddb2-satoshi-background.jpg' />
                </Helmet>
        );
    }
};

export default Metadata;

