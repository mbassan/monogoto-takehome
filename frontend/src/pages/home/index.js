import React from 'react';
import moment from 'moment';
import {useHistory} from 'react-router-dom';
import Button from 'ui/components/Button';
import Icon from 'ui/components/Icon';
import List from 'ui/components/List';
import Panel from 'ui/components/Panel';
import StatusIndicator from 'ui/components/StatusIndicator';
import Avatar from 'ui/components/Avatar';
import {
  Tabs, Tab, TabPanel, TabControls,
} from 'ui/components/Tabs';
import TaskCreationForm from 'containers/TaskCreationForm';
import { GlobalStateContext } from 'context/GlobalContext';
import { NotificationsContext } from 'context/NotificationsContext';
import actions from 'context/actions/globalActions';
import request from 'ui/utilities/request';
import { addOrUpdateDocs } from 'ui/utilities/stateUtils';
import { dateFormat } from 'ui/utilities/constants';
import styles from './Home.module.css';

export default function Home() {
  const { dispatch, state } = React.useContext(GlobalStateContext);
  const { addNotification } = React.useContext(NotificationsContext);
  const [todoTasks, setTodoTasks] = React.useState({ docs: [], totalPages: 1 });
  const [alerts, setAlerts] = React.useState({ docs: [], totalPages: 1 });
  const [notifications, setNotifications] = React.useState({ docs: [], totalPages: 1 });
  const [selectedTodoTasks, setSelectedTodoTasks] = React.useState([]);
  const [selectedAlerts, setSelectedAlerts] = React.useState([]);
  const [selectedNotifications, setSelectedNotifications] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [taskData, setTaskData] = React.useState(null);

  const loadData = React.useCallback(async () => {
    try {
      dispatch({ type: actions.SET_LOADING, payload: true });
      const result = await Promise.all([
        request('get', '/to-do/get', {
          workspace: state.workspace?._id,
          page: 1,
          perPage: 5,
        }),
        request('get', '/notification/get', {
          workspace: state.workspace?._id,
          page: 1,
          perPage: 5,
        }),
        request('get', '/alert/get', {
          workspace: state.workspace?._id,
          page: 1,
          perPage: 5,
        }),
      ]);

      if (!result[0].data) {
        addNotification({ text: 'Could not load to-do tasks.' });
      }
      if (!result[1].data) {
        addNotification({ text: 'Could not load notifications.' });
      }
      if (!result[2].data) {
        addNotification({ text: 'Could not load alerts.' });
      }
      setTodoTasks(result[0].data);
      setNotifications(result[1].data);
      setAlerts(result[2].data);
    } catch (error) {
      addNotification({ text: 'There was an error while loading data.' });
    }
    dispatch({ type: actions.SET_LOADING, payload: false });
  }, [
    state.workspace._id,
    dispatch,
    addNotification,
    setTodoTasks,
    setNotifications,
    setAlerts,
  ]);

  function onSaveTask(task) {
    addOrUpdateDocs({
      newDocs: [task],
      stateVar: todoTasks,
      setFunc: setTodoTasks,
      perPage: 5,
      update: true,
      cb: () => setShowModal(false),
    });
     addNotification({ text: 'Task updated.', type: 'success' });
    return true;
  }

  function editTodoTask(row) {
    setTaskData(row);
    setShowModal(true);
  }

  function deleteTodoTasks() {
    console.log(selectedTodoTasks);
  }

  function deleteAlerts() {
    console.log(selectedAlerts);
  }

  function deleteNotifications() {
    console.log(selectedNotifications);
  }

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const history = useHistory();

  return (
    <>
      <div className={styles.homeTitle}>
        {state.workspace.name}
      </div>
      <div className={styles.homeGridContainer}>
        <List
          title="To Do List"
          selectable
          scrollable
          listItems={todoTasks.docs}
          emptyMessage="No items to show."
          onSelectRow={(rows) => setSelectedTodoTasks(rows)}
          cols={[
            {
              name: 'name',
              label: 'Task',
            },
            {
              name: 'description',
              label: 'description',
            },
            {
              name: 'assignedTo',
              label: 'Assigned To',
              render: (row) => row.assignedTo.username,
            },
            {
              name: 'status',
              label: 'Status',
              render: (row) => <StatusIndicator status={row.severity} noText />,
            },
            {
              name: 'edit',
              label: '',
              render: (row) => (
                <Button variant="secondary" size="small" onClick={() => editTodoTask(row)}>
                  <Icon variant="secondary" type="edit" />
                  Edit
                </Button>
              ),
            },
          ]}
          headerElems={[(
            <Button variant="danger" onClick={deleteTodoTasks} iconButton>
              <Icon type="trash" variant="primary" />
            </Button>
          )]}
        />
        <List
          title="Alerts"
          selectable
          listItems={alerts.docs}
          emptyMessage="No alerts to show."
          onSelectRow={(rows) => setSelectedAlerts(rows)}
          cols={[
            {
              name: 'title',
              label: 'Name',
              render: (row) => (
                <div >
                  <Avatar size="small" onClick={row.destination?() => history.push(row.destination):() => console.log('no destination')} className={styles.avatar}>
                    <Icon variant="danger" type="alert-circle" className={styles.alertIcon} />
                  </Avatar>
                  {row.name}
                </div>
              ),
            },
            {
              name: 'createdAt',
              label: 'Time',
              render: (row) => moment(row.createdAt).format(dateFormat.time),
            },
          ]}
          headerElems={[(
            <Button variant="danger" onClick={deleteAlerts} iconButton>
              <Icon type="trash" variant="primary" />
            </Button>
          )]}
        />
        <Panel noHeader>
          <Tabs variant="panel">
            <Tab caption="Admin Stats" name="stats" />
            <Tab caption="API Credentials" name="api-creds" />
            <Tab caption="Last Scan Finished" name="last-scan" />
            <TabControls>
              <Button variant="danger" onClick={() => console.log('no idea what to delete here')} iconButton>
                <Icon type="trash" variant="primary" />
              </Button>
            </TabControls>
            <TabPanel name="stats">
              Charts go here.
            </TabPanel>
            <TabPanel name="api-creds">
              Api creds here.
            </TabPanel>
            <TabPanel name="last-scan">
              Last scan info.
            </TabPanel>
          </Tabs>
        </Panel>
        <List
          title="Notifications"
          selectable
          listItems={notifications.docs}
          emptyMessage="No notifications to show."
          onSelectRow={(rows) => setSelectedNotifications(rows)}
          cols={[
            {
              name: 'title',
              label: 'Name',
              render: (row) => (
                <>
                  <Avatar size="small" className={styles.avatar}>
                    <Icon variant="action" type="bell" className={styles.bellIcon} />
                  </Avatar>
                  {row.name}
                </>
              ),
            },
            {
              name: 'createdAt',
              label: 'Time',
              render: (row) => moment(row.createdAt).format(dateFormat.time),
            },
          ]}
          headerElems={[(
            <Button variant="danger" onClick={deleteNotifications} iconButton>
              <Icon type="trash" variant="primary" />
            </Button>
          )]}
        />
        <TaskCreationForm
          showModal={showModal}
          setShowModal={setShowModal}
          onSave={(task) => onSaveTask(task)}
          taskData={taskData}
        />
      </div>
    </>
  );
}
