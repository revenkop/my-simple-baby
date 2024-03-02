# React Native Email Tag Input

React Native Email Tag Input is a customizable React Native component that allows inputting email addresses in a tag-like format. It supports validation, keyboard navigation, custom rendering, and more.

![Example GIF](assets/preview.gif)


## Installation

Install the package using npm:

```bash
npm install react-native-email-tag-input
```

## Usage

Import the component into your project:

```
import EmailTagInput from 'react-native-email-tag-input';
```


Then, use it as follows:


```
<EmailTagInput
  textInputStyle={styleMailForm.textInput}
  emailTagsItemStyle={styleMailForm.emailTagsItem}
  value={sendMailFrom.recipients}
  suggestionData={contactsState.contacts}
  CloseIcon={() => (
    <Icon name={'close-circle'} size={20} color={'#fff'} />
  )}
  Avatar={({email}) => (
    <Avatar
      onSelectMails={() => {}}
      name={getInitials(email)}
      avatarSize={48}
      fontSize={16}
    />
  )}
  subComponent={() => (
    <TouchableOpacity
      onPress={() => {
        setCCshow(state => !state);
      }}
      style={{
        flex: 0,
        marginRight: 4,
        marginTop: 12,
      }}>
      <Icon name={`arrow-${ccShow ? 'up' : 'down'}-s-line`} size={34} />
    </TouchableOpacity>
  )}
  onChange={recipients => {
    mailsDispatch({
      type: 'SET_INPUT_SEND_MAIL_RECIPIENTS',
      value: recipients,
    });
  }}
  placeholder={'Recipient'}
/>

```

## Props


- `value` (Array): The list of email addresses to display.
- `onChange` (Function): Triggered when there is a change in the email list.
- `subComponent` (Component): Used to add extra content below EmailTagInput.
- `placeholder` (String): Placeholder text to display inside the TextInput.
- `textInputStyle` (Object): Styles for the TextInput component.
- `emailTagsItemStyle` (Object): Styles for each email tag item.
- `suggestionData` (Array): List of suggested email addresses.
- `Avatar` (Component): Used to display avatars for email addresses.
- `CloseIcon` (Component): Used to remove an email tag.