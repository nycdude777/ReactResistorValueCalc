import RCCCalculator from './rcc-calculator'




describe('TOLERANCE dictionary', ()=>{
    let rcc = new RCCCalculator();

    it('is defined', ()=> {
        expect(rcc.TOLERANCE).toBeDefined();
    });
    it('has 13 keys', ()=> {
        expect(Object.keys(rcc.TOLERANCE).length).toBe(13);
    });
});

describe('COLOR dictionary', ()=>{

    let rcc = new RCCCalculator();

    it('is defined', ()=> {
        expect(rcc.COLOR).toBeDefined();
    });
    it('has 13 keys', ()=> {
        expect(Object.keys(rcc.COLOR).length).toBe(13);
    });
    it('getColors() returns all colors', ()=> {
        expect(rcc.getColors().length).toBe(13);
    });
});

describe('BANDCOLOREXCLUSION dictionary', ()=>{

    let rcc = new RCCCalculator();

    it('is defined', ()=> {
        expect(rcc.BANDCOLOREXCLUSION).toBeDefined();
    });
    it('has 5 keys', ()=> {
        expect(Object.keys(rcc.BANDCOLOREXCLUSION).length).toBe(5);
    });
});

describe('COLORCODE entries', ()=>{
    
    let rcc = new RCCCalculator();

    let items = rcc.getColorCodeItems();
    
    it('has 13 entries', ()=> {
        expect(items.length).toBe(13);
    });
    
    
    test('maps to all colors', ()=>{
        items.forEach(item => {
            expect(rcc.COLOR[item.color.name]).toBeDefined();
        });
    });
    
});

describe('Available band colors', ()=> {

    let rcc = new RCCCalculator();
    
    for(let i=0; i<5; i++){

        let colorNames = rcc.getAvailableBandColors(i);

        test('each band has them', ()=>{
            expect(colorNames.length).toBeGreaterThan(0);
        });

    }

});


//some regression tests
describe('', ()=> {

    let rcc = new RCCCalculator();
    
    test('test some 4 band calculations', ()=>{
        expect(
            rcc.getOhmsFrom4bands.apply(rcc, 
                ['Red', 'Blue', 'Black', 'Green']
            ).ohms
        ).toBe(26);

    });

    test('test some 5 band calculations', ()=>{
        expect(
            rcc.getOhmsFrom5bands.apply(rcc, 
                ['Red', 'Blue', 'Black', 'Orange', 'Green']
            ).ohms
        ).toBe(260000);

    });
    

});