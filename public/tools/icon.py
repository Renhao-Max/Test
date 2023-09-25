from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM

pic=svg2rlg('M.svg')
renderPM.drawToFile(pic,'abc.png')