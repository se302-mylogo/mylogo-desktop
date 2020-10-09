import React, { useEffect, useRef, useState } from 'react';
import Editor, { monaco } from '@monaco-editor/react';
import Terminal from 'terminal-in-react';
import { Card, Grid, Typography } from '@material-ui/core';
import SplitterLayout from 'react-splitter-layout';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';
import { NodeConfig } from 'konva/types/Node';

const path = require('path');


function uriFromPath(_path: any): string {
  let pathName = path.resolve(_path).replace(/\\/g, '/');

  if (pathName.length > 0 && pathName.charAt(0) !== '/') {
    pathName = `/${pathName}`;
  }
  return encodeURI(`file://${pathName}`);
}

monaco.config({
  paths: {
    vs: uriFromPath(
      path.join(__dirname, '../node_modules/monaco-editor/min/vs')
    )
  }
});

// const layout: Layout[] = [
//   {
//     i: 'commandBar',
//     x: 0, y: 0, w: 12, h: 1,
//     isDraggable: false,
//     isResizable: false
//   },
//   {
//     i: 'canvas',
//     x: 0, y: 0, w: 6, h: 12,
//     isDraggable: false,
//     resizeHandles: ['e']
//   },
//   {
//     i: 'editor',
//     x: 6, y: 0, w: 6, h: 10,
//     minW: 2,
//     isDraggable: false,
//     resizeHandles: ['w', 'sw']
//   },
//   {
//     i: 'terminal',
//     x: 6, y: 10, w: 6, h: 10,
//     minW: 2,
//     isDraggable: false,
//     resizeHandles: ['w', 'nw']
//   }
// ];

interface AnimTo extends NodeConfig {
  onFinish?: Function;
  onUpdate?: Function;
  duration?: number;
}

async function konvaTo(node: Konva.Node, to: AnimTo): Promise<void> {
  return new Promise(resolve => node.to({
    ...to,
    onFinish: () => resolve()
  }));
}


export function EditorDemoPage() {
  const [image] = useImage(uriFromPath(path.join(__dirname, '../resources/turtle.png')));
  const imgRef = useRef<Konva.Image>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (imgRef.current && start) {
      const anim = async () => {
        const img = imgRef.current as Konva.Image;
        await konvaTo(img, {
          offsetX: -100,
          offsetY: 0,
          duration: 1
        });
        await konvaTo(img, {
          offsetX: 0,
          offsetY: 0,
          duration: 1
        });
        await konvaTo(img, {
          offsetX: 100,
          offsetY: 0,
          duration: 1
        });
        await konvaTo(img, {
          offsetX: 0,
          offsetY: 0,
          duration: 1
        });
        await konvaTo(img, {
          offsetX: 0,
          offsetY: -100,
          duration: 1
        });
        await konvaTo(img, {
          offsetX: 0,
          offsetY: 0,
          duration: 1
        });
        await konvaTo(img, {
          offsetX: 0,
          offsetY: 100,
          duration: 1
        });
        await konvaTo(img, {
          offsetX: 0,
          offsetY: 0,
          duration: 1
        });
      };
      anim();
    }
  }, [start]);

  return (
    <>
      <SplitterLayout
        percentage={true}
        vertical={false}
        primaryMinSize={33}
        secondaryInitialSize={67}
        secondaryMinSize={33}
      >
        <Card
          key={'canvas'}
          style={{
            height: '100%',
            width: '100%',
            padding: 10,
            boxSizing: 'border-box'
          }}
        >
          <Grid
            container
            justify={'center'}
            alignItems={'center'}
            style={{
              height: '100%'
            }}
          >
            <Grid
              item
            >
              <Stage height={600} width={600}>
                <Layer>
                  <Image
                    image={image}
                    x={275}
                    y={275}
                    width={50}
                    height={50}
                    ref={imgRef}
                  />
                </Layer>
              </Stage>
            </Grid>
          </Grid>
        </Card>
        <SplitterLayout
          percentage={true}
          vertical={true}
          primaryMinSize={25}
          secondaryInitialSize={50}
          secondaryMinSize={25}
        >
          <Card
            style={{
              height: '100%',
              width: '100%',
              padding: 10,
              boxSizing: 'border-box'
            }}
            key={'editor'}
          >
            <Typography variant={'h5'}>
              命令文件编辑器
            </Typography>
            <Editor
              language={'javascript'}
              theme="dark"
              value={''}
            />
          </Card>
          <Card
            style={{
              height: '100%',
              width: '100%',
              padding: 10,
              boxSizing: 'border-box'
            }}
            key={'terminal'}
          >
            <Typography variant={'h5'}>
              命令行
            </Typography>
            <Terminal
              color='green'
              backgroundColor='black'
              hideTopBar={true}
              allowTabs={false}
              style={{
                fontWeight: 'bold', fontSize: '1em'
              }}
              commands={{
                'open-google': () => window.open('https://www.google.com/', '_blank'),
                popup: () => alert('Terminal in React'),
                start: () => setStart(true)
              }}
              msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
            />
          </Card>
        </SplitterLayout>
      </SplitterLayout>;
      {/*<ResponsiveGrid
        layouts={{
          lg: layout,
          md: layout
        }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        containerPadding={{
          lg: [10, 10],
          md: [10, 10]
        }}
      >
        <Paper key={'commandBar'}>

        </Paper>
        <Card
          key={'canvas'}
        >
          111
        </Card>
        <Card
          style={{
            height: '100%',
            padding: 10,
            boxSizing: 'border-box'
          }}
          key={'editor'}
        >
          <Typography variant={'h5'}>
            命令文件编辑器
          </Typography>
          <Editor
            language={'javascript'}
            theme="dark"
            value={''}
          />
        </Card>
        <Card
          style={{
            height: '100%',
            padding: 10,
            boxSizing: 'border-box'
          }}
          key={'terminal'}
        >
          <Typography variant={'h5'}>
            命令行
          </Typography>
          <Terminal
            color='green'
            backgroundColor='black'
            hideTopBar={true}
            allowTabs={false}
            style={{
              fontWeight: 'bold', fontSize: '1em'
            }}
            commands={{
              'open-google': () => window.open('https://www.google.com/', '_blank'),
              popup: () => alert('Terminal in React')
            }}
            msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
          />
        </Card>
      </ResponsiveGrid>*/}
    </>
  );
}
