import ContactUsForm from './ContactUsForm';

export const Empty = {
  component: ContactUsForm,
  props: {
    formId: 'EnquiryFormExample',
    listingTitle: 'Sauna with a view',
    authorDisplayName: 'Janne',
    onSubmit(values) {
      console.log('submit with values:', values);
    },
  },
  group: 'forms',
};
