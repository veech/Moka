import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ScreenContainer, LoadingScreen } from '../common';

import CoffeeDetail from './coffee-detail';
import CoffeeTile from './coffee-tile';

import * as actions from '../../actions';

class CoffeeStation extends Component {
	static navigationOptions = {
		title: 'coffee station',
	};

	renderPrefs(prefs) {
		return prefs.map((pref, index) => (
			<CoffeeTile
				key={index}
				pref={pref}
				onPress={() =>
					this.props.setDefaultCoffee(this.props.me, index + 1)
				}
			/>
		));
	}

	render() {
		const { me, loading } = this.props;

		if (!me) return <LoadingScreen />;

		return (
			<ScreenContainer style={{ padding: 0 }}>
				<ScrollView>
					<CoffeeDetail pref={me.prefs[0]} loading={loading} />
					<View
						style={{
							flexWrap: 'wrap',
							alignItems: 'flex-start',
							flexDirection: 'row',
						}}
					>
						{this.renderPrefs(me.prefs.slice(1))}
					</View>
				</ScrollView>
			</ScreenContainer>
		);
	}
}

const mapStateToProps = state => ({
	me: state.users.me,
	loading: state.users.loading,
});

export default connect(mapStateToProps, actions)(CoffeeStation);
