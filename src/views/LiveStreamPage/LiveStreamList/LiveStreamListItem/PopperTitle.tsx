import React from 'react';
import { createStyles, Paper, Popper, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            pointerEvents: 'none',
            backgroundColor: '#4c4c4c',
            maxWidth: 300,
        },
        typography: {
            padding: 5,
        },
    }),
);

interface PoppertTitleProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    title: string;
}

export const PopperTitle = ({ open, anchorEl, title }: PoppertTitleProps) => {
    const classes = useStyles();

    return (
        <Popper className={classes.root} open={open} anchorEl={anchorEl} placement={'bottom-start'}>
            <Paper>
                <Typography className={classes.typography} variant={'subtitle2'} noWrap>
                    {title}
                </Typography>
            </Paper>
        </Popper>
    );
};
