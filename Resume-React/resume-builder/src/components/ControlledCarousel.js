import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { templateImagesPaths } from './Data/Data'; // Assuming this file contains the template image paths and names
import { updateState } from '../ReduxManager/dataStoreSlice';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS
const shortid = require('shortid');

function ControlledCarousel() {
  const [isMouseOver, setIsMouseOver] = useState('MouseIsNotOver');
  const dispatch = useDispatch();

  const groupedTemplates = [];
  for (let i = 0; i < templateImagesPaths.length; i += 3) {
    groupedTemplates.push(templateImagesPaths.slice(i, i + 3));
  }

  return (
    <div style={{ minWidth: '300px' }}>
      <div className='d-flex justify-content-center mt-5'></div>

      <div className='container' style={{ color: '#1f4287' }}>
        <Carousel>
          {groupedTemplates.map((group, groupIndex) => (
            <Carousel.Item key={shortid.generate()}>
              <div className='d-flex justify-content-around'>
                {group.map((currentTemplate) => (
                  <div
                    key={shortid.generate()}
                    className="template-container"  
                    style={{ position: 'relative', width: '30%' }}
                    onMouseOver={() => setIsMouseOver(currentTemplate.name)}
                    onMouseOut={() => setIsMouseOver('MouseIsNotOver')}
                  >
                    <div className='w-100 d-flex justify-content-center'>
                      <h5>{currentTemplate.name}</h5>
                    </div>
                    <img
                      className="d-block w-100 image-aspect-ratio"
                      src={currentTemplate.imageSource}
                      alt='template'
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    {isMouseOver === currentTemplate.name && (
                      <Link to="/detailsfillingpage/personalinfo">
                        <button
                          className='btn btn-primary'
                          style={{ position: 'absolute', top: '50%', right: '25%' }}
                          onClick={() => {
                            dispatch(
                              updateState({
                                key: 'selectedTemplate',
                                value: currentTemplate.name,
                              })
                            );
                          }}
                        >
                          Use Template
                        </button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}


export default ControlledCarousel;
