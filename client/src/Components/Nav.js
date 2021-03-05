import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import KitchenIcon from '@material-ui/icons/Kitchen';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import LogoutIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
    root: {
        width: '100vw',
        backgroundColor: 'black',
        position: "fixed",
        left: "0",
        bottom: "0",
        '& > *': {
            color: 'white',
        }
    },
});

function Nav() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction component={Link} to="/pantry" label="Pantry" icon={<KitchenIcon />} />
            <BottomNavigationAction component={Link} to="/recipe" label="Recipe Search" icon={<SearchIcon />} />
            <BottomNavigationAction component={Link} to="/logout" label="Logout" icon={<LogoutIcon />} />
        </BottomNavigation>
    );
}

export default Nav;
