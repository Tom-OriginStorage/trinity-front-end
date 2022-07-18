import {
  faWallet,
  faPiggyBank,
  faChartPie,
  faHandHoldingDollar,
  faMemory,
  faQuestionCircle,
  faStoreSlash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const navDashboard = [
  {
    title: 'Market Overview',
    icon: <FontAwesomeIcon icon={faChartPie} />,
    path: '/markets',
  },
  {
    title: 'My Assets',
    icon: <FontAwesomeIcon icon={faWallet} />,
    path: '/dashboard',
  },
  {
    title: 'Deposit/Withdraw',
    icon: <FontAwesomeIcon icon={faPiggyBank} />,
    path: '/access',
  },
  {
    title: 'History',
    icon: <FontAwesomeIcon icon={faMemory} />,
    path: '/records',
  },
  {
    title: 'FAQ',
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
    path: '/faq',
  },
]

