import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import ReactGridLayout, { Layout, WidthProvider } from 'react-grid-layout';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';

const { ipcRenderer } = require('electron');

const GridLayout = WidthProvider(ReactGridLayout);

const layouts: Layout[] = [
  {
    i: 'title',
    x: 0, y: 0, w: 12, h: 5,
    static: true
  },
  {
    i: 'single',
    x: 0, y: 5, w: 6, h: 10,
    static: true
  },
  {
    i: 'double',
    x: 6, y: 5, w: 6, h: 10,
    static: true
  }
];

export function WelcomePage() {
  function handleOpenEditor() {
    ipcRenderer.invoke('open-editor');
  }

  function handleOpenRoomList() {
    ipcRenderer.invoke('open-rooms-list');
  }

  return (
    <Paper
      style={{
        height: '100%',
        width: '100%'
      }}
    >
      <GridLayout
        rowHeight={30}
        cols={12}
        layout={layouts}
      >
        <Grid
          key={'title'}
          container
          justify={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h3'}>
            欢迎使用Logo开发环境！
          </Typography>
        </Grid>
        <Grid
          key={'single'}
          container
          justify={'center'}
          alignItems={'center'}
        >
          <Button
            onClick={handleOpenEditor}
          >
            <Grid
              container
              justify={'center'}
              alignContent={'center'}
            >
              <Grid
                item
                container
                xs={12}
                justify={'center'}
                alignItems={'center'}
              >
                <PersonIcon
                  style={{
                    fontSize: 96
                  }}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                justify={'center'}
                alignItems={'center'}
              >
                <Typography variant={'h5'}>
                  单人绘图
                </Typography>
              </Grid>
            </Grid>
          </Button>
        </Grid>
        <Grid
          key={'double'}
          container
          justify={'center'}
          alignItems={'center'}
        >
          <Button
            onClick={handleOpenRoomList}
          >
            <Grid
              container
              justify={'center'}
              alignContent={'center'}
            >
              <Grid
                item
                container
                xs={12}
                justify={'center'}
                alignItems={'center'}
              >
                <PeopleIcon
                  style={{
                    fontSize: 96
                  }}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                justify={'center'}
                alignItems={'center'}
              >
                <Typography variant={'h5'}>
                  双人绘图
                </Typography>
              </Grid>
            </Grid>
          </Button>
        </Grid>
      </GridLayout>
    </Paper>
  );
}
