import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable, { Icons } from 'material-table';
import React, { forwardRef, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import InputIcon from '@material-ui/icons/Input';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

export const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

export function RoomsListPage() {
  const [addDialogOpen, setOpen] = useState(false);

  return (
    <>
      <Dialog
        open={addDialogOpen}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          <Typography>
            创建新房间
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction={'column'} alignItems={'stretch'}>
            <TextField
              label={'房主昵称'}
            />
            <TextField
              label={'画布长度'}
              type={'number'}
            />
            <TextField
              label={'画布宽度'}
              type={'number'}
            />
            <FormControl style={{ width: '100%' }}>
              <InputLabel id={`playType-helper`}>合作类型</InputLabel>
              <Select
                value={0}
                labelId={`playType-helper`}
                style={{ width: '100%' }}
              >
                <MenuItem value={1}>双人单海龟</MenuItem>
                <MenuItem value={2}>双人双海龟</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label={'备注'}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid item container direction={'row'} justify={'space-around'}>
            <Button color={'primary'} variant={'contained'}>
              新增房间
            </Button>
            <Button color={'secondary'} variant={'contained'}>
              重置
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      <MaterialTable<any>
        style={{
          height: '100vh',
          width: '100vw'
        }}
        columns={[
          {
            title: '房主',
            field: 'host'
          },
          {
            title: '画布长度',
            field: 'canvasWidth'
          },
          {
            title: '画布宽度',
            field: 'canvasHeight'
          },
          {
            title: '合作类型',
            field: 'playType',
            render: data => ['双人单海龟', '双人双海龟'][data.playType]
          },
          {
            title: '人数',
            field: 'peoples'
          },
          {
            title: '备注',
            field: 'notes'
          }
        ]}
        data={[
          {
            host: 'test1',
            canvasWidth: 800,
            canvasHeight: 600,
            playType: 0,
            peoples: 2,
            notes: 'TestNote'
          },
          {
            host: 'test2',
            canvasWidth: 1920,
            canvasHeight: 1080,
            playType: 1,
            peoples: 1,
            notes: 'TestNote'
          },
          {
            host: 'test3',
            canvasWidth: 2160,
            canvasHeight: 1440,
            playType: 0,
            peoples: 1,
            notes: 'TestNote'
          },
          {
            host: 'test4',
            canvasWidth: 1366,
            canvasHeight: 768,
            playType: 1,
            peoples: 2,
            notes: 'TestNote'
          }
        ]}
        options={
          {
            actionsColumnIndex: -1
          }
        }
        actions={[
          {
            icon: () => <InputIcon/>,
            tooltip: '加入房间',
            position: 'row',
            onClick: () => null
          },
          {
            icon: () => <AddIcon/>,
            tooltip: '创建房间',
            onClick: () => setOpen(true),
            isFreeAction: true
          }
        ]}
        title={'加入或创建在线房间'}
        icons={tableIcons}
      />
    </>
  );
}
