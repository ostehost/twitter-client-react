import Layout from '../components/layout';

import { useDispatch, useSelector } from "react-redux";
import { typeChange, countChange, searchChange, sort, loadTweets, loadTweetsFailure } from '../actions/tweetsActions'

import TextField, { HelperText, Input } from '@material/react-text-field';
// import LinearProgress from '@material/react-linear-progress';
// there is a an issue with the official LinearProgress,
// where it flashes on load so using rmwc version for now
import { LinearProgress } from '@rmwc/linear-progress';
import Select, { Option } from '@material/react-select';
import Button from '@material/react-button';
import { Snackbar } from '@material/react-snackbar';
import Radio, { NativeRadioControl } from '@material/react-radio';

import { DataTable, DataTableContent, DataTableHead, DataTableRow, DataTableHeadCell, DataTableBody, DataTableCell } from '@rmwc/data-table'

const Index = () => {
  const dispatch = useDispatch();

  const error = useSelector(state => state.tweetsReducer.error);
  const tweets = useSelector(state => state.tweetsReducer.tweets);
  const inputValue = useSelector(state => state.tweetsReducer.search);
  const radioValue = useSelector(state => state.tweetsReducer.type);
  const selectValue = useSelector(state => state.tweetsReducer.count);
  const sortBy = useSelector(state => state.tweetsReducer.sort_by);
  const sortOrder = useSelector(state => state.tweetsReducer.sort_order);
  const tweetsLoading = useSelector(state => state.tweetsReducer.tweets_loading);

  const submit = (evt) => {
    evt.preventDefault();
    dispatch(loadTweets());
  }

  const input = (value) => {
    dispatch(searchChange(value));
  }

  const radio = (value) => {
    dispatch(typeChange(value));
  }

  const select = (item) => {
    let value = item.getAttribute('data-value');
    if (value === selectValue) {
      return;
    }
    dispatch(countChange(value));

    if (tweets.length && inputValue && radioValue) {
      dispatch(loadTweets());
    }
  }

  const setSort = (newSortBy, newSortOrder) => {
    dispatch(sort(newSortBy, newSortOrder));
  }


  return <Layout>

    <form className="form-container" onSubmit={evt => submit(evt)}>
      <div className="controls">
        <TextField
          label='Search'
        ><Input
            required
            value={inputValue}
            onChange={(e) => input(e.currentTarget.value)} />
        </TextField>

        <Button unelevated type="submit">Submit</Button>
      </div>

      <div className="controls">
        <div className="radio-container">
          <Radio label='Most Recent' key='recent'>
            <NativeRadioControl
              required
              checked={radioValue === 'recent'}
              name='type'
              value='recent'
              id='recent'
              onChange={(e) => radio(e.target.value)}
            />
          </Radio>
          <Radio label='Most Popular' key='popular'>
            <NativeRadioControl
              required
              checked={radioValue === 'popular'}
              name='type'
              value='popular'
              id='popular'
              onChange={(e) => radio(e.target.value)}
            />
          </Radio>
          <Radio label='Real Time' key='real_time'>
            <NativeRadioControl
              required
              checked={radioValue === 'real_time'}
              name='type'
              value='real_time'
              id='real_time'
              onChange={(e) => radio(e.target.value)}
            />
          </Radio>
        </div>

        <Select enhanced
          label='Results'
          value={selectValue}
          onEnhancedChange={(index, item) => select(item)}>
          <Option value='10'>10</Option>
          <Option value='25'>25</Option>
          <Option value='50'>50</Option>
          <Option value='100'>100</Option>
        </Select>
      </div>
    </form>

    <LinearProgress closed={!tweetsLoading} />

    <DataTable>
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeadCell
              sort={sortBy === 'created_at' ? sortOrder : null}
              onSortChange={sortOrder => {
                setSort('created_at', sortOrder);
              }}
            >Created</DataTableHeadCell>
            <DataTableHeadCell
              sort={sortBy === 'place' ? sortOrder : null}
              onSortChange={sortOrder => {
                setSort('place', sortOrder);
              }}
            >Place</DataTableHeadCell>
            <DataTableHeadCell
              sort={sortBy === 'id' ? sortOrder : null}
              onSortChange={sortOrder => {
                setSort('id', sortOrder);
              }}
            >ID</DataTableHeadCell>
            <DataTableHeadCell
              sort={sortBy === 'favorite_count' ? sortOrder : null}
              onSortChange={sortOrder => {
                setSort('favorite_count', sortOrder);
              }}>Favorite Count</DataTableHeadCell>
            <DataTableHeadCell
              sort={sortBy === 'retweet_count' ? sortOrder : null}
              onSortChange={sortOrder => {
                setSort('retweet_count', sortOrder);
              }}>Retweet Count</DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {tweets.length ? tweets.map((tweet, index) => {
            return <DataTableRow key={index}>
              <DataTableCell>{new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              }).format(Date.parse(tweet.created_at))}</DataTableCell>
              <DataTableCell>{tweet.place ? tweet.place.country_code : 'n/a'}</DataTableCell>
              <DataTableCell>{tweet.id}</DataTableCell>
              <DataTableCell>{tweet.favorite_count}</DataTableCell>
              <DataTableCell>{tweet.retweet_count}</DataTableCell>
            </DataTableRow>
          }) : <DataTableRow><DataTableCell colSpan="5" alignMiddle>Search to display tweets</DataTableCell></DataTableRow>}
        </DataTableBody>
      </DataTableContent>
    </DataTable>

    { error ? <Snackbar message={error} onClose={() => dispatch(loadTweetsFailure(null))} actionText="dismiss" /> : null }
  </Layout>
};

export default Index;