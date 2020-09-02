/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Button, StyleSheet, View, Text, StatusBar} from 'react-native';
import WebView from 'react-native-webview';
import Auth0 from 'react-native-auth0';
import jwtDecode from 'jwt-decode';

export const auth0Domain = 'nutrien-poc.auth0.com';
export const auth0ClientId = 'fovxaOvsdc1y0gGhOrInjM4j2LSbRAsV'; // native
// export const auth0ClientId = "B0ui7yLeHvWTjEFq1txz7E6zieUAaRI1"; // spa
export const cxhUrl = 'https://my.dev.nutrienagsolutions.com';
// export const cxhUrl = 'http://localhost:3000';

const auth0 = new Auth0({
  domain: auth0Domain,
  clientId: auth0ClientId,
});

const App = () => {
  const [credentials, setCredentials] = useState(null);

  const idClaims = credentials?.idToken
    ? jwtDecode(credentials?.idToken)
    : null;

  const login = () =>
    auth0.webAuth
      .authorize({scope: 'openid email profile'})
      .then(setCredentials)
      .catch((error) => console.log(error));

  const logout = () =>
    auth0.webAuth
      .clearSession()
      .then(() => setCredentials(null))
      .catch((error) => console.log(error));

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {credentials ? (
        <>
          <Text style={styles.title}>You are logged in, {idClaims.email}!</Text>
          <Button title="Sign out" onPress={logout} />
          <WebView
            style={styles.webview}
            source={{uri: cxhUrl}}
            sharedCookiesEnabled={true}
          />
        </>
      ) : (
        <Button title="Sign in" onPress={login} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  webview: {
    flexGrow: 1,
    width: '100%',
  },
});

export default App;
