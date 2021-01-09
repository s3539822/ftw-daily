import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-victoria',
    predictionPlace: {
      address: 'Victoria, Australia',
      bounds: new LatLngBounds(new LatLng(-33.9804, 150.0771), new LatLng(-39.2303, 140.922128326191)),
    },
  },
  {
    id: 'default-new-south-wales',
    predictionPlace: {
      address: 'New South Wales, Australia',
      bounds: new LatLngBounds(new LatLng(-28.08696659275, 159.208731278622), new LatLng(-37.5097267803825, 140.999474167179)),
    },
  },
  {
    id: 'default-queensland',
    predictionPlace: {
      address: 'Queensland, Australia',
      bounds: new LatLngBounds(new LatLng(-9.04366970633253, 153.646438298977), new LatLng(-29.1778939937021, 137.995956)),
    },
  },
  {
    id: 'default-western-australia',
    predictionPlace: {
      address: 'Western Australia, Australia',
      bounds: new LatLngBounds(new LatLng(-13.5925142065245, 129.013019307777), new LatLng(-35.2164286984682, 112.821294400027)),
    },
  },
  {
    id: 'default-south-australia',
    predictionPlace: {
      address: 'South Australia, Australia',
      bounds: new LatLngBounds(new LatLng(-25.9963750760608, 141.002957), new LatLng(-38.140346399969, 128.979500521469)),
    },
  },
  {
    id: 'default-northern-territory',
    predictionPlace: {
      address: 'Northern Territory, Australia',
      bounds: new LatLngBounds(new LatLng(-10.8680320010295, 138.063931682402), new LatLng(-25.9994829999899, 128.9794912)),
    },
  },
  {
    id: 'default-tasmania',
    predictionPlace: {
      address: 'Tasmania, Australia',
      bounds: new LatLngBounds(new LatLng(-39.1264695006237, 159.046433492357), new LatLng(-54.835465496212, 143.719163305701)),
    },
  },
  {
    id: 'default-act',
    predictionPlace: {
      address: 'Australian Capital Territory, Australia',
      bounds: new LatLngBounds(new LatLng(-35.1245160189857, 149.399287999689), new LatLng(-35.9207629972803, 148.76267400118)),
    },
  },
];
